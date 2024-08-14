import axios from 'axios';

const url = process.env.EXPO_PUBLIC_DB_HOST
const options = { withCredentials: true };

axios.interceptors.request.use(conf => ({
  ...conf,
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
    wakeUp: () => requests.get({ url: `${url}/api/plans` }),
  },
  user: {
    sendAnswers: (body) => requests.post({ url: `${url}/api/user/answer`, body }),
    logIn: (body) => requests.post({ url: `${url}/api/user/login`, body }),
    signUp: (body) => requests.post({ url: `${url}/api/user/signup`, body }),
    update: (body) => requests.put({ url: `${url}/api/user/${body._id}`, body }),
    getUser: (params) => requests.get({ url: `${url}/api/user/${params.id}`, params }),
    remove: (id) => requests.delete({ url: `${url}/api/user/${id}` }),
    create: (body) => requests.post({ url: `${url}/api/user/new`, body }),
    getUsers: (params) => requests.get({ url: `${url}/users`, params }),
    restorePassword: (body) => requests.post({ url: `${url}/api/user/restore`, body }),
    resetPassword: (body) => requests.post({ url: `${url}/api/user/reset`, body }),
  },
  plan: {
    getPlans: (params) => requests.get({ url: `${url}/api/plans`, params }),
    createPlan: (body) => requests.post({ url: `${url}/api/plans/new`, body }),
    updatePlan: (body) => requests.put({ url: `${url}/api/plans/${body._id}`, body }),
    getOptions: (body) => requests.post({ url: `${url}/api/plans`, body }),
    removePlan: (id) => requests.delete({ url: `${url}/api/plans/${id}` }),
  },
  promo: {
    get: (params) => requests.get({ url: `${url}/api/promo`, params }),
    create: (body) => requests.post({ url: `${url}/api/promo`, body }),
    update: (body) => requests.put({ url: `${url}/api/promo/${body._id}`, body }),
    remove: (id) => requests.delete({ url: `${url}/api/promo/${id}` }),
  },
  recipe: {
    getIngredients: () => requests.get({ url: `${url}/ingredients`}),
    getAll: (params) => requests.get({ url: `${url}/recipes`, params }),
    create: (body) => requests.post({ url: `${url}/recipes`, body }),
    update: (body) => requests.put({ url: `${url}/recipes/${body._id}`, body }),
    remove: (id) => requests.delete({ url: `${url}/recipes/${id}` }),
  },
  payment: {
    auth: () => requests.get({ url: `${url}/payment/auth` }),
    createTransaction: (body) => requests.post({ url: `${url}/payment/createTransaction`, body }),
  }
};
