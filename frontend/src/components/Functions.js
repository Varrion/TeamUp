export const truncate = (str, truncateLength = 10, strLength = 15) => {
    return str.length > strLength ? str.substring(0, truncateLength) + "..." : str;
}

