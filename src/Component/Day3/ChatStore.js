
import {observable,action,computed,autorun} from 'mobx';

class ChatStore {
  @observable
  storeData = []

  @observable
  imageArray = []
  // storeData = new Array(1000).fill({text:'测试',type:0})


  getData = () =>{
    return this.storeData;
  }

  addElement = (data) =>{
    // this.storeData.push(data)
    console.log(data);
    this.storeData = this.storeData.concat(data)

    if (data.type == 1) {
      this.imageArray.push(this.storeData.length-1)
    }
  }

  getImgData = () =>{
    console.log(this.storeData);
    console.log(this.imageArray);
    var img = []
    for (var i = 0; i < this.imageArray.length; i++) {
      img.push(this.storeData[this.imageArray[i]])
    }
    return img
  }
}
export default new ChatStore
