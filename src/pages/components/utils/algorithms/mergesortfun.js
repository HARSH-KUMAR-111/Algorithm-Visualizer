// mergeSortFun.js
import sleep from "../sleepFun";

const mergeSortFun = async (setArr, arr, time, setDisable) => {
    const merge = async (arr, left, mid, right) => {
      // Helper function to merge two sorted subarrays
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;
      
      while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i].number <= rightArr[j].number) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
        }
        k++;
        setArr([...arr]); // Update the array for animation
        await sleep(time);
      }
  
      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
        setArr([...arr]); // Update the array for animation
        await sleep(time);
      }
  
      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
        setArr([...arr]); // Update the array for animation
        await sleep(time);
      }
    };
  
    const mergeSort = async (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
      }
    };
  
    setDisable(true);
    await mergeSort(arr, 0, arr.length - 1);
    setDisable(false);
  };
  
  export default mergeSortFun;
  