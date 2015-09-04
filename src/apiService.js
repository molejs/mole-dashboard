import config from './config';

export function fetchSingleLog(id) {
  return new Promise((resolve, reject) => {
    fetch(config.moleServerUrl + `/log/${id}`)
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
  });
}

export function fetchLogPage(page) {
  page = page && page >= 1 ? page : 1;
  return new Promise((resolve, reject) => {
    fetch(config.moleServerUrl + `/logs?skip=${(page-1)*25}`)
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
  });
}
