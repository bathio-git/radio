export default function formattedDate(x) {
    const currentTime = new Date().getTime();
    const timestamp = new Date(x).getTime();
    const timeDiff = Math.floor((currentTime - timestamp) / 1000); // Time difference in seconds
  
    if (timeDiff < 60) {
      return `${timeDiff} sec ago`;
    } else if (timeDiff < 60 * 60) {
      const minutes = Math.floor(timeDiff / 60);
      return `${minutes} min ago`;
    } else if (timeDiff < 24 * 60 * 60) {
      const hours = Math.floor(timeDiff / (60 * 60));
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (timeDiff < 7 * 24 * 60 * 60) {
      const days = Math.floor(timeDiff / (24 * 60 * 60));
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (timeDiff < 4 * 7 * 24 * 60 * 60) {
      const weeks = Math.floor(timeDiff / (7 * 24 * 60 * 60));
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (timeDiff < 12 * 4 * 7 * 24 * 60 * 60) {
      const months = Math.floor(timeDiff / (4 * 7 * 24 * 60 * 60));
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(timeDiff / (12 * 4 * 7 * 24 * 60 * 60));
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  }
  