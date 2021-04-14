<template>
  <div class="center-screen">

    <Loading></Loading>
  </div>
</template>
<script>
import firebase from 'firebase/app';
import Loading from "./components/Loading";
export default {
  components:{
    Loading
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
    },
    onChange(e) {
      var files = e.target.files;
      this.createFile(files[0]);
    },
    async createFile(upload) {
      let file = upload;
      console.log(file.type);
      var allowedExtensions =
          /(\/jpg|\/jpeg|\/png)$/i;

      if (!allowedExtensions.exec(file.type)) {
        alert('Invalid file type');
        return false;
      }
      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      };
      var storageRef = firebase.storage().ref();
// Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

                // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
            });
          }
      );
    },
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.center-screen {
  position: relative;
  max-width: 100vw;
  max-height: 100vh;
  background: #FAFAFB;
  border-radius: 8px;
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.rectangle {

  position: absolute;
  width: 402px;
  height: 469px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 15%);
  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

}

.header {
  text-align: center;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */
  color: #4F4F4F;
  letter-spacing: -0.035em;
  margin: 30px 0 20px 0;

}

a {
  cursor: pointer;
}

.note {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.035em;

  /* Gray 3 */

  color: #828282;
}

.uploading-field {
  margin: 30px 40px 25px 40px;
  width: 320px;
  height: 218.9px;
  background: #F6F8FB;
  border: 1px dashed #97BEF4;

  border-radius: 12px;
}

.image {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.btn:hover {
  opacity: 0.5;
}

.btn {

  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 101px;
  height: 31.98px;
  background: #2F80ED;
  border-radius: 8px;
}

label {
  font-family: sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.035em;

  color: #FFFFFF;
}

.image-field {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}

.dragDrop {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: -0.035em;

  /* Gray 4 */

  color: #BDBDBD;

}

</style>