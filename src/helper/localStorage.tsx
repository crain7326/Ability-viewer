class LocalStorage {
  /**
   * 특정 key의 data를 반환한다.
   * @param _key 조회할 data의 key
   * @returns string(data O), false(data X)
   */
  getData(_key: string) {
    const data = localStorage.getItem(_key);
    return data || false;
  }

  /**
   * 새로운 data 저장, 동일한 key가 있을 경우 덮어쓰기해서 업데이트 한다.
   * @param _key 저장할 data의 key
   * @param _data data
   */
  setData(_key: string, _data: string) {
    localStorage.setItem(_key, _data);
  }

  /**
   * 특정 key의 data를 삭제한다.
   * @param _key 삭제할 data의 key
   */
  deleteData(_key: string) {
    localStorage.removeItem(_key);
  }

  /**
   * Localstorage의 모든 data를 삭제한다.
   */
  clear() {
    localStorage.clear();
  }
}

const storage = new LocalStorage();
export default storage;
