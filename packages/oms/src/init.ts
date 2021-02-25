// eslint-disable-next-line no-unused-vars
interface String {
    format(...replacements: string[]): string;
}

if (!String.prototype.format) {
  // eslint-disable-next-line no-extend-native
  String.prototype.format = function() {
    const args = arguments
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match
    })
  }
}
