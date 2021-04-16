<template>
  <div class="container h-screen flex items-center flex-col justify-center bg-gray-100">
    <Upload v-if="!uploading && !uploaded" @changed="onChange" @dropped="onDrop"></Upload>
    <Loading v-else-if="uploading"></Loading>

    <Uploaded v-else-if="uploaded" :link="link" ></Uploaded>

    <p class="mt-8 text-black mx-auto px-4 md:px-0 text-center">Designed by devChallenges made with 💖‍ by <span class="font-bold text-indigo-600">Oliver</span></p>
  </div>

</template>
<script>
import firebase from "firebase/app";
import Loading from "./components/Loading";
import Upload from "@/components/Upload";
import Uploaded from "@/components/Uploaded";

export default {
  components: {
    Uploaded,
    Loading,
    Upload
  },
  data() {
    return {
      uploaded: false,
      uploading: false,
      link:null
    }
  },
  methods: {
    onDrop: function (e) {
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
    },
    onChange(e) {
      var files = e.target.files;
      console.log(files)
      this.createFile(files[0]);
    },
    async createFile(upload) {
      let file = upload;
      // console.log(file.type);
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
// Upload file and metadata to the object 'images/*.jpg'
      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
// Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            this.uploading = true;
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
              this.uploaded =true;
              this.uploading=false;
              console.log('File available at', downloadURL);
              this.link=downloadURL;
            });
          }
      );
    },
  }

}
</script>
<style>


</style>