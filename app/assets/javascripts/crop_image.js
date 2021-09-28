/*global $*/
/*global Cropper*/

$(function () {
  let cropperImg = document.getElementById('cropper-img');
  const btn = document.getElementById('crop-btn');
  const modal3 = document.getElementById('modal3');
  const mask = document.querySelector('.mask');
  const item_form = document.getElementById('item_form');
  let item_image = document.getElementById('item_image');
  const cropper_area = document.getElementById('cropper-area');

  let image_viw = document.getElementById('cropper-img');

  let fileName;


  item_form.addEventListener('change', function(e){
    modal3.classList.remove('hidden');
    mask.classList.remove('hidden');
    let file = e.target.files[0];
    fileName = file.name;

    let reader = new FileReader();

    if(file.type.indexOf('image')<0){
      return false;
    }

    reader.onload = (function(file){
      return function(event){
        console.log(cropper_area);
        cropper_area.innerHTML = "";
        let cropped_image = document.createElement('img');
        console.log(cropped_image);
        cropped_image.src = event.target.result;
        cropped_image.id = "crop_image";
        cropped_image.title = file.name;
        cropper_area.appendChild(cropped_image);
        initCrop();
      };
    })(file);
    reader.readAsDataURL(file);
  });

    let cropper;
    function initCrop() {
      cropper = new Cropper(crop_image,{
        dragmode: 'move',
        aspectRatio: 1.5/1,
        restore: false,
        guides: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        modal: true,
        ready: function(){
          croppable = true;
        }
      });
        // 初回表示時
      crop_image.addEventListener('ready', function(e){
        cropping(e);
      });
      // 画像をドラッグした際の処理
      crop_image.addEventListener('cropend', function(e){
        cropping(e);
      });
      // 画像を拡大・縮小した際の処理
      crop_image.addEventListener('zoom', function(e){
        cropping(e);
      });
    }

    let croppedCanvas;
    function cropping(e) {
      croppedCanvas = cropper.getCroppedCanvas();
      let resultImgUrl = croppedCanvas.toDataURL();
      // let resultImgBlob = croppedCanvas.toBlob;
      let result = document.getElementById('cpi');
      result.src = resultImgUrl;
    }

    btn.addEventListener('click', function(){
      modal3.classList.add('hidden');
      mask.classList.add('hidden');
    });

  $('#submit').on('click',function(){
    console.log("AAA");
    croppedCanvas.toBlob(function(blob) {
      const blob_file = new FileReader([blob], fileName);
      let formData = new FormData();
      formData.append('image', blob_file);

      $.ajax({
        url: '/items',
        type: 'post',
        catch: false,
        dataType: 'json',
        processData: false,
        data: formData,
      })
      .done(function(response){
        console.debug("result" + response);
      })
      .fail(function(xhr){
        alert('失礼しました');
        console.debug("result" + xhr);
      });
    });
  });
})