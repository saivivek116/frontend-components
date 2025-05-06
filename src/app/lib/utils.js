function _getRandomColor() {
    const randomColor = () => Math.floor(Math.random() * 256);
    const r = randomColor().toString(16).padStart(2, '0');
    const g = randomColor().toString(16).padStart(2, '0');
    const b = randomColor().toString(16).padStart(2, '0');
  
    return `#${r}${g}${b}`;
  }
  
  export function getRandomColors(limit) {
    const colors = [];
    const seen = new Set();
  
    for (let i = 0; i < limit; i++) {
      let color = _getRandomColor();
  
      while (seen.has(color)) {
        color = _getRandomColor();
      }
  
      colors.push(color);
    }
  
    return colors;
  }


 export function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return [...array]
  }


  export const generateRandomOtp = (size=5)=>{
    //simple way is to generate 5 random numbers and make a string thats it
    let randomnumber = "";
    for(let i=0;i<size;i++){
        randomnumber += Math.floor(Math.random()*9)

    }
    return randomnumber;
  }