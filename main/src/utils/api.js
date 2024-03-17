import axios from 'axios';
// import i18n from 'i18next';

const options = { withCredentials: true };

axios.interceptors.request.use(conf => ({
  ...conf,
  //   headers: { 'Accept-Language': i18n.language },
  url: `${conf.url}${conf.url.includes('?') ? '&' : '?'}r=${Math.random()}`,
}));

const request = async (promise, noParse) => {
  return await promise.then()
    .then(res => {
      const { error } = res.data || {};

      if (error) {
        if (['100', '103', '104', '107', '132', 'EmailNotFound'].includes(error.code)) {
          error.hide = true;
        }

        // const errorMessage = i18n.t(`Errors.${error.code}`);

        // if (errorMessage.includes('Errors')) {
        //   throw error;
        // } else {
        //   throw { ...error, message: errorMessage };
        // }
      }

      //   actions.session.updateTimer();

      return res;
    })
    .then(res => (noParse ? res : res.data))
    .catch(error => {
      if (error) {
        alert(error.message);
      }

      throw error;
    });
}


const requests = {
  get: ({ url, params = {}, noParse, opts = {} }) => request(axios.get(`${url}`, {
    ...opts, ...options,
    params
  }), noParse),
  delete: ({ url, data = {}, noParse }) => request(axios.delete(`${url}`, { ...options, data }), noParse),
  put: ({ url, body = {}, noParse }) => request(axios.put(`${url}`, body, options), noParse),
  post: ({ url, body = {}, opt = {}, noParse }) =>
    request(axios.post(`${url}`, body, { ...options, ...opt }), noParse),
};

export default {
  user: {
    sendAnswers: (url, body) => requests.post({ url: `${url}/api/user/answer`, body }),
    signUp: (url, body) => requests.post({ url: `${url}/api/user/signup`, body }),
    update: (url, body) => requests.put({ url: `${url}/api/user/${body._id}`, body }),
  },
  plan: {
    getPlans: (url, params) => requests.get({ url: `${url}/api/plans`, params }),
    createPlan: (url, body) => requests.post({ url: `${url}/api/plans/new`, body }),
    updatePlan: (url, body) => requests.put({ url: `${url}/api/plans/${body._id}`, body }),
    getOptions: (url, body) => requests.post({ url: `${url}/api/plans`, body }),
  },
  admin: {
    getRecipes: (url, params) => requests.get({ url: `${url}/admin/recipes`, params }),
    createRecipe: (url, body) => requests.post({ url: `${url}/admin/recipes`, body }),
    updateRecipe: (url, body) => requests.put({ url: `${url}/admin/recipes/${body._id}`, body }),
    removeRecipe: (url, id) => requests.delete({ url: `${url}/admin/recipes/${id}` }),
    getUsers: (url, params) => requests.get({ url: `${url}/admin/users`, params }),
  },
};
