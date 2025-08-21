const stringService = {
    getFirstAndLastName: (fullName: string): string => {
      const parts = fullName.trim().split(/\s+/)
      if (parts.length === 0) return ''
      const first = parts[0]
      const last = parts.length > 1 ? parts[parts.length - 1] : ''
      return last ? `${first} ${last}` : first
    },
    getFirstLetters: (fullName: string, count: number): string => {
      const parts = fullName.trim().split(/\s+/)
      if (count <= 0 || parts.length === 0) return ''
      if (parts.length === 1) return parts[0].substring(0, count)
      const firstName = parts[0]
      const lastName = parts[parts.length - 1]
      const firstCount = Math.ceil(count / 2)
      const lastCount = count - firstCount
      const firstLetters = firstName.substring(0, firstCount)
      const lastLetters = lastName.substring(0, lastCount)
      return lastLetters ? `${firstLetters}${lastLetters}` : firstLetters
    },
    normalizeString: (str: string): string => {
        return str
            .trim()
            .replace(/\s+/g, ' ')
            .toLowerCase();
    },
    capitalizeFirstLetters: (str: string): string => {
        return str
            .toLowerCase()
            .replace(/(^|\.\s*)([a-z])/g, (_match, p1, p2) => p1 + p2.toUpperCase());
    },
    removeSpacesAndLowerCase: (str: string): string => {
        return str.replace(/\s+/g, '').toLowerCase();
    },
  }
  
  export default stringService
  