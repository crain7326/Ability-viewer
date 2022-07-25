import { observable, action, makeObservable, configure } from 'mobx';

// action으로만 observable(state) 수정하도록 설정
configure({ enforceActions: 'observed' });

export enum OptionType {
  fontFamily = 'fontFamily',
  fontSize = 'fontSize',
  paragraphHeigth = 'paragraphHeigth',
  lineHeigth = 'lineHeigth',
}

export enum ViewType {
  ridi = '리디북스',
  kakao = '카카오',
}

export type FontFamily = 'KoPub 바탕' | 'KoPub 돋움' | 'KoPub 명조';

// singleton pattern
class OptionStore {
  static exist = false;
  static instance: any;

  fontSizeNum = 5;
  paragraphHeigthNum = 1;
  lineHeigthNum = 1;

  // 글꼴
  fontFamily: FontFamily = 'KoPub 바탕';

  setFontFamily(type: FontFamily) {
    this.fontFamily = type;
  }

  // 글자 크기
  fontSize = `ridi_fs_${this.fontSizeNum}`;
  // 문단 너비
  paragraphHeigth = `ridi_ph_${this.paragraphHeigthNum}`;
  // 줄 간격
  lineHeigth = `ridi_lh_${this.lineHeigthNum}`;

  // 제목
  title: string | undefined = '';
  setTitle(_title: string | undefined) {
    this.title = _title;
  }
  // 태그
  tags: { name: string }[] | undefined;
  setTags(_tags: { name: string }[] | undefined) {
    this.tags = _tags;
  }
  // 사용자 입력 Text
  text: string | undefined = '';
  setText(_text: string | undefined) {
    this.text = _text;
  }
  // 입력한 text 배열
  textBundle: string[] = [];
  setTextBundle(_text: string) {
    const text = _text.replace(/(\r\n|\n|\r)/gm, '<BR>');
    const arr = text.split('<BR>');
    const textBundle: string[] = arr.filter((text) => text !== '');
    this.textBundle = textBundle;
  }

  // 뷰어 설정 (리디북스, 카카오)
  viewerType = '리디북스';

  // param: viewer.ridi or kakao
  setViewerType(type: ViewType) {
    this.viewerType = type;
  }

  optionPlus(type: OptionType) {
    switch (type) {
      case OptionType.fontSize:
        if (this.fontSizeNum === 12) return;
        this.fontSizeNum++;
        this.fontSize = `ridi_fs_${this.fontSizeNum}`;
        break;
      case OptionType.paragraphHeigth:
        if (this.paragraphHeigthNum === 6) return;
        this.paragraphHeigthNum++;
        this.paragraphHeigth = `ridi_ph_${this.paragraphHeigthNum}`;
        break;
      case OptionType.lineHeigth:
        if (this.lineHeigthNum === 6) return;
        this.lineHeigthNum++;
        this.lineHeigth = `ridi_lh_${this.lineHeigthNum}`;
        break;
      default:
        break;
    }
  }

  optionMinus(type: OptionType) {
    switch (type) {
      case OptionType.fontSize:
        number: if (this.fontSizeNum === 1) return;
        this.fontSizeNum--;
        this.fontSize = `ridi_fs_${this.fontSizeNum}`;
        break;
      case OptionType.paragraphHeigth:
        if (this.paragraphHeigthNum === 1) return;
        this.paragraphHeigthNum--;
        this.paragraphHeigth = `ridi_ph_${this.paragraphHeigthNum}`;
        break;
      case OptionType.lineHeigth:
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
      viewerType: observable,
      textBundle: observable,
      title: observable,
      text: observable,
      tags: observable,

      // action 등록
      setTitle: action,
      setText: action,
      setTags: action,
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
