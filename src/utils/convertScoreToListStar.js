
const convertScoreToListStar = (score) => {
  let listStar = [0, 0, 0, 0, 0]

  for(let i=0; i<listStar.length; i++) {
    if (score >= 1) {
      listStar[i] = 1;
      score -= 1
    } else if (score < 1) {
      listStar[i] = score
      break
    } 
  }

  return listStar
}

export default convertScoreToListStar