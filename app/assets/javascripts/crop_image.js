/*global $*/
/*global Cropper*/

$(function () {
  // let image = document.getElementById('imageModal');
  // let img_field = document.getElementById('item_image');
  // let cropModal = document.getElementById('modal3');
  // let beforeUpload = document.getElementById('beforeUpload');
  // let button = document.getElementById('btn-save');

  let cropperImg = document.getElementById('cropper-img');
  const btn = document.getElementById('crop-btn');
  const modal3 = document.getElementById('modal3');
  const mask = document.querySelector('.mask');
  let image = document.getElementById('item_image');
  let image_viw = document.getElementById('cropper-img');

  let dataX = document.getElementById('dataX');
  let dataY = document.getElementById('dataY');
  let dataWidth = document.getElementById('dataWidth');
  let dataHeight = document.getElementById('dataHeight');


  image.addEventListener('change', function(e){
    modal3.classList.remove('hidden');
    mask.classList.remove('hidden');
    URL.revokeObjectURL(image_viw.src);
    image_viw.src = URL.createObjectURL(image.files[0]);

  let options = {
    dragmode: 'crop',
    aspectRatio: 1.5/1,
    restore: false,
    guides: false,
    center: false,
    highlight: true,
    cropBoxMovable: true,
    cropBoxResizable: true,
    modal: true,
    crop: (e) => {
      dataX.value = (Math.round(e.detail.x));
      dataY.value = (Math.round(e.detail.y));
      dataWidth.value = (Math.round(e.detail.width));
      dataHeight.value = (Math.round(e.detail.height));
    }
  };

    let cropper = new Cropper(cropperImg, options);
    let blob;
    let fileName = image.files[0].name;

    btn.addEventListener('click', function(){
      // image_file_field の中身を削除
      image.value = '';
      const croppedCanvas = cropper.getCroppedCanvas();
      let resultImgUrl = croppedCanvas.toDataURL();
      // let resultImgBlob = croppedCanvas.toBlob;
      let result = document.getElementById('cpi');
      result.src = resultImgUrl;

      croppedCanvas.toBlob(function(b) {
        const fileOfBlob = new File([b],fileName);
        let formData = new FormData();
        formData.append('item[image]', fileOfBlob);
      });

      // フォーム要素append type file input タグを追加
      // let formData = new FormData(document.forms[0]);
      // formData.append('data1', blob,'image.png');

      modal3.classList.add('hidden');
      mask.classList.add('hidden');
    });
  });





  // let options = {
  //   dragmode: 'crop',
  //   aspectRatio: 1/1,
  //   restore: false,
  //   guides: false,
  //   center: false,
  //   highlight: true,
  //   cropBoxMovable: true,
  //   cropBoxResizable: true,
  //   modal: true,
  //   crop: (e) => {
  //     dataX.val(Math.round(e.detail.x));
  //     dataY.val(Math.round(e.detail.y));
  //     dataWidth.val(Math.round(e.detail.width));
  //     dataHeight.val(Math.round(e.detail.height));
  //   }
  // };

  // // when file upload
  // img_field.change((e) => {
  //   image.cropper('destroy').removeAttr('src');
  //   let file = e.target.files[0];
  //   let reader = new FileReader();
  //   if (file.type.indexOf('image') < 0) {
  //     window.alert("画像を選択してください");
  //     return ;
  //   }
  //   reader.onload = ((e) => {
  //     image.attr('src',"");
  //     image.attr('src', e.target.result);
  //     cropModal.modal('show');
  //     cropModal.on('shown.bs.modal', () => {
  //     image.cropper(options);
  //     });
  //   });
  //   reader.readAsDataURL(file);
  // });
  // // onclick save button
  // button.click(() => {
  //   imgCropping();
  // });

  // // modalを閉じたとき、cropper要素を初期化
  // cropModal.on('hidden.bs.modal',function() {
  //   $image.cropper('destroy').removeAttr('src');
  //   let $cropperContainer = $('.cropper-container');
  //   $cropperContainer.remove();
  // });

  // function imgCropping() {
  //   if (!croppable) {
  //     alert('トリミングする画像が用意されていません');
  //     return false;
  //   }
  //   beforeUpload.hide();
  //   let croppedData = $image.cropper('getCroppedCanvas').toDataURL();
  //   croppedImage.attr('src', croppedData);
  //   cropModal.modal('hide');
  // }
});