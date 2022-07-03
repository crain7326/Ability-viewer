import { observable, action, makeObservable, configure } from 'mobx';

// action으로만 observable(state) 수정하도록 설정
configure({ enforceActions: 'observed' });

// singleton pattern
class OptionStore {
  static exist = false;
  static instance: any;

  fontSizeNum = 5;
  paragraphHeigthNum = 1;
  lineHeigthNum = 1;

  // 글꼴
  fontFamily = '바탕';

  setFontFamily(type: string) {
    if (typeof type !== 'string') return;
    this.fontFamily = type;
  }

  // 글자 크기
  fontSize = `ridi_fs_${this.fontSizeNum}`;
  // 문단 너비
  paragraphHeigth = `ridi_ph_${this.paragraphHeigthNum}`;
  // 줄 간격
  lineHeigth = `ridi_lh_${this.lineHeigthNum}`;
  // 사용자 입력 Text
  text = '';
  setText(_text: string | undefined) {
    this.text = _text;
  }
  // 입력한 text 배열
  textBundle = [];
  setTextBundle(_text: string) {
    const text = _text.replace(/(\r\n|\n|\r)/gm, '<BR>');
    const arr = text.split('<BR>');
    const textBundle: string[] = arr.filter((text) => text !== '');
    this.textBundle = textBundle;
  }

  // option type
  optionType = Object.freeze({
    fontFamily: 'fontFamily',
    fontSize: 'fontSize',
    paragraphHeigth: 'paragraphHeigth',
    lineHeigth: 'lineHeigth',
  });

  // 뷰어 설정 (리디북스, 카카오)
  viewerType = '리디북스';
  //  viewer type
  viewer = Object.freeze({
    ridi: '리디북스',
    kakao: '카카오',
  });

  // param: viewer.ridi or kakao
  setViewerType(type: string) {
    if (typeof type !== 'string') return;
    this.viewerType = type;
  }

  optionPlus(type: string) {
    switch (type) {
      case this.optionType.fontSize:
        if (this.fontSizeNum === 12) return;
        this.fontSizeNum++;
        this.fontSize = `ridi_fs_${this.fontSizeNum}`;
        break;
      case this.optionType.paragraphHeigth:
        if (this.paragraphHeigthNum === 6) return;
        this.paragraphHeigthNum++;
        this.paragraphHeigth = `ridi_ph_${this.paragraphHeigthNum}`;
        break;
      case this.optionType.lineHeigth:
        if (this.lineHeigthNum === 6) return;
        this.lineHeigthNum++;
        this.lineHeigth = `ridi_lh_${this.lineHeigthNum}`;
        break;
      default:
        break;
    }
  }

  optionMinus(type: string) {
    switch (type) {
      case this.optionType.fontSize:
        number: if (this.fontSizeNum === 1) return;
        this.fontSizeNum--;
        this.fontSize = `ridi_fs_${this.fontSizeNum}`;
        break;
      case this.optionType.paragraphHeigth:
        if (this.paragraphHeigthNum === 1) return;
        this.paragraphHeigthNum--;
        this.paragraphHeigth = `ridi_ph_${this.paragraphHeigthNum}`;
        break;
      case this.optionType.lineHeigth:
        if (this.lineHeigthNum === 1) return;
        this.lineHeigthNum--;
        this.lineHeigth = `ridi_lh_${this.lineHeigthNum}`;
        break;
      default:
        break;
    }
  }

  constructor() {
    if (OptionStore.exist) return OptionStore.instance;

    OptionStore.exist = true;
    OptionStore.instance = this;

    makeObservable(this, {
      // observable(state) 등록
      fontSizeNum: observable,
      paragraphHeigthNum: observable,
      lineHeigthNum: observable,
      fontFamily: observable,
      fontSize: observable,
      paragraphHeigth: observable,
      lineHeigth: observable,
      text: observable,
      viewerType: observable,
      textBundle: observable,

      // action 등록
      setText: action,
      optionPlus: action,
      optionMinus: action,
      setViewerType: action,
      setFontFamily: action,
      setTextBundle: action,
    });
  }
}

const optionStore = new OptionStore();

export default optionStore;
