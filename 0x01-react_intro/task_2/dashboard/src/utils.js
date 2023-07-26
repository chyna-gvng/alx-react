//function that return the current year

function getFullYear() {
  let currentYear = new Date();
  return currentYear.getFullYear();
}

function getFooterCopy(isIndex) {
  if (!isIndex) return "Holberton School main dashboard";
  return "Holberton School";
}

function getLatestNotification() {
    return {
      __html: "<strong>Urgent requirement</strong> - complete by EOD"
    }
}
export {getFullYear, getFooterCopy, getLatestNotification};
