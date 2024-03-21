 export function formatDate(dateString) {
    const date = new Date(dateString);

    // Get day, month, and year
    const day = date.getDate().toString().padStart(2, '0'); // padStart is used to ensure two-digit representation
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const year = date.getFullYear();

    // Format as dd-mm-yyyy
    const formattedDate = `${day}-${month}-${year}`;
    
    return formattedDate;
}
export const setTotalPageCount = (totalRecords, limit) => {
    return Math.ceil(totalRecords / limit)
  }
