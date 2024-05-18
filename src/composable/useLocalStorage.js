export default function useLocalStorage() {
  const saveLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
  const getLocalStorage = (key, item) => {
    if( localStorage.getItem(key) && item) {
        const data = JSON.parse(localStorage.getItem(key))
        return data[item]
    }
    else if(localStorage.getItem(key)) {
       return localStorage.getItem(key)
    }
  }
  const clearLocalStorage = (key) => {
    if(key) {
        localStorage.removeItem(key);
    } else {
        localStorage.clear();
    }
  }

  return {
    saveLocalStorage,
    getLocalStorage,
    clearLocalStorage
  }
}