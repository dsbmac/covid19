export const capitalizeFirst = (word) => {
  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
  return capitalizedWord
}

export const formatDate = (dateStr) => {
  let newDate = dateStr.split("T")[0]
  newDate = newDate.split("-")
  newDate.shift()
  newDate = newDate.join("-")
  return newDate
}
