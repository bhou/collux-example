export default {
  INCREMENT: () => {
    return {
      actionType: 'INCREMENT'
    }
  },

  DECREMENT: () => {
    return {
      actionType: 'DECREMENT'
    }
  },

  RENDER: (url) => {
    return {
      actionType: 'RENDER',
      url: url
    }
  },

  LOGIN_EMAIL_CHANGED: (email) => {
    return {
      actionType: 'LOGIN_EMAIL_CHANGED',
      email   
    }
  },

  LOGIN_PASSWORD_CHANGED: (password) => {
    return {
      actionType: 'LOGIN_PASSWORD_CHANGED',
      password
    }
  },

  LOGIN: () => {
    return {
      actionType: 'LOGIN'
    }
  },

  TODO_TOGGLE_COMPLETE: (id) => {
    return {
      actionType: 'TODO_TOGGLE_COMPLETE',
      id
    }
  },

  TODO_DELETE: (id) => {
    return {
      actionType: 'TODO_DELETE',
      id
    }
  },

  TODO_INPUT_CHANGE: (text) => {
    return {
      actionType: 'TODO_INPUT_CHANGE',
      text
    }
  },

  TODO_CREATE: () => {
    return {
      actionType: 'TODO_CREATE'
    }
  }
}
