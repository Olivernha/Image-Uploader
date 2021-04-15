<template>
  <div class="finished flex flex-col items-center py-4">
 <span class="material-icons text-green-500 ">
check_circle
</span>
    <p class="text-2xl font-semibold tracking-tight my-2 text-gray-700">Uploaded Successfully</p>
    <div class="container mx-auto w-dg-holder  h-dg-holder my-6">
      <img class="rounded-md w-full h-48"
           :src="link"
           alt="">
      <div class="flex justify-center items-center bg-gray-100 rounded-md h-10 mt-6">
        <span class="px-3 overflow-ellipsis text-xs overflow-hidden w-64 whitespace-nowrap" ref="myLink">https://firebasestorage.googleapis.com/v0/b/image-uploaded-33694.appspot.com/o/images%2F6017da3ed8f203fe979b16dae1ad2259.png?alt=media&token=ab158b7d-eec2-4410-97b4-244d63559f41</span>
        <button @click="copyLink" :class="[copyFinished ? 'bg-red-500' : 'bg-blue-500']"
                class=" text-white w-20 text-xs py-2 rounded-md focus:outline-none">
          {{ copyFinished ? 'Copied !' : 'Copy Link'}}
        </button>

      </div>
   <div class="flex justify-center mt-6">
     <a href="" class="hover:opacity-75 tracking-tight underline text-red-400">Back to Upload</a>
   </div>
    </div>


  </div>


</template>

<script>
export default {
  name: "Uploaded",
  props:['link'],
  data() {
    return {
      copyFinished: false
    }
  },
  methods: {

    copyLink() {
      this.copyFinished = true;
      var text = this.$refs.myLink.innerHTML;
      navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
      }, function (err) {
        this.copyFinished = false
        console.error('Async: Could not copy text: ', err);
      });


    }
  }
}
</script>

<style scoped>
.material-icons {
  font-size: 4rem;
}
</style>