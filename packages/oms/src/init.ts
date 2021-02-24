// @ts-ignore
if (!String.prototype.format) {
  // @ts-ignore
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
