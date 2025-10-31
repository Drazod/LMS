/**
 * Converts an ISO date string (e.g., '2025-09-25T07:35:41.045Z')
 * into the 'DD/MM/YYYY' format.
 *
 * @param isoDateString The date string in ISO format.
 * @returns The date string in 'DD/MM/YYYY' format, or an empty string if the date is invalid.
 */
function convertIsoToDDMMYYYY(isoDateString: string): string {
    const date = new Date(isoDateString);

    // Check if the date object is valid
    if (isNaN(date.getTime())) {
        console.error(`Invalid date string provided: ${isoDateString}`);
        return "";
    }

    // Get date parts
    // getUTCDate() returns the day of the month (1-31) in UTC
    const day = date.getUTCDate();
    // getUTCMonth() returns the month (0-11) in UTC, so we add 1
    const month = date.getUTCMonth() + 1;
    // getUTCFullYear() returns the year (four digits) in UTC
    const year = date.getUTCFullYear();

    // Pad day and month with a leading zero if they are a single digit
    const paddedDay = String(day).padStart(2, '0');
    const paddedMonth = String(month).padStart(2, '0');

    // Combine and return in DD/MM/YYYY format
    return `${paddedDay}/${paddedMonth}/${year}`;
}

export default convertIsoToDDMMYYYY;