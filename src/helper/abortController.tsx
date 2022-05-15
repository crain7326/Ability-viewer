declare var process: {
  env: {
    REACT_APP_API_URL: string;
  };
};

/**
 * 최종으로 호출된 api만 비동기 처리하는 Class.
 */
class FetchAbortController {
  #abortController: AbortController | null = null;

  /**
   * 함수 호출시 이전에 요청된 비동기 처리가 있을 경우 중단시키고, 현재 요청받은 비동기 처리를 수행한다. (가장 최신의 비동기 처리만 수행)
   * @param _url api 요청할 url (ex. users, books?tag=:1)
   * @param _options fetch 요청 옵션
   * @returns api 요청 결과
   */
  handleAbort = async (_url: string, _options: RequestInit) => {
    if (this.#abortController) {
      this.#abortController.abort();
      this.#abortController = null;
    }

    this.#abortController = new AbortController();

    const result: any = await this.#abortFetch(
      this.#abortController.signal,
      _url,
      _options
    );
    this.#abortController = null;

    return result;
  };

  #abortFetch = (_signal: AbortSignal, _url: string, _options: RequestInit) => {
    const executor = (resolve: Function, reject: Function) => {
      const ERROR = '[FetchAbortController] Abort.';

      if (_signal.aborted) {
        reject(ERROR);
        return;
      }

      fetch(`${process.env.REACT_APP_API_URL}/${_url}`, _options)
        .then((res) => resolve(res.json()))
        .catch((err) => reject(err));

      _signal.addEventListener('abort', () => {
        reject(ERROR);
        return;
      });
    };

    return new Promise(executor);
  };
}

const fetchAbortController = new FetchAbortController();
export default fetchAbortController;
