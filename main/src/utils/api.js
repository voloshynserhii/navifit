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
  server: {
    wakeUp: (url) => requests.get({ url: `${url}/api/plans` }),
  },
  user: {
    sendAnswers: (url, body) => requests.post({ url: `${url}/api/user/answer`, body }),
    logIn: (url, body) => requests.post({ url: `${url}/api/user/login`, body }),
    signUp: (url, body) => requests.post({ url: `${url}/api/user/signup`, body }),
    update: (url, body) => requests.put({ url: `${url}/api/user/${body._id}`, body }),
    getUser: (url, params) => requests.get({ url: `${url}/api/user/${params.id}`, params }),
    remove: (url, id) => requests.delete({ url: `${url}/api/user/${id}` }),
    create: (url, body) => requests.post({ url: `${url}/api/user/new`, body }),
    getUsers: (url, params) => requests.get({ url: `${url}/users`, params }),
    restorePassword: (url, body) => requests.post({ url: `${url}/api/user/restore`, body }),
    resetPassword: (url, body) => requests.post({ url: `${url}/api/user/reset`, body }),
  },
  plan: {
    getPlans: (url, params) => requests.get({ url: `${url}/api/plans`, params }),
    createPlan: (url, body) => requests.post({ url: `${url}/api/plans/new`, body }),
    updatePlan: (url, body) => requests.put({ url: `${url}/api/plans/${body._id}`, body }),
    getOptions: (url, body) => requests.post({ url: `${url}/api/plans`, body }),
    removePlan: (url, id) => requests.delete({ url: `${url}/api/plans/${id}` }),
  },
  promo: {
    get: (url, params) => requests.get({ url: `${url}/api/promo`, params }),
    create: (url, body) => requests.post({ url: `${url}/api/promo`, body }),
    update: (url, body) => requests.put({ url: `${url}/api/promo/${body._id}`, body }),
    remove: (url, id) => requests.delete({ url: `${url}/api/promo/${id}` }),
  },
  recipe: {
    getAll: (url, params) => requests.get({ url: `${url}/recipes`, params }),
    create: (url, body) => requests.post({ url: `${url}/recipes`, body }),
    update: (url, body) => requests.put({ url: `${url}/recipes/${body._id}`, body }),
    remove: (url, id) => requests.delete({ url: `${url}/recipes/${id}` }),
  },
};
