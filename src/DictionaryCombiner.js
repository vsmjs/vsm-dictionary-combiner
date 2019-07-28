const Dictionary = require('vsm-dictionary');

module.exports = class DictionaryCombiner extends Dictionary {

  constructor(options) {
    const opt = options || {};
    super(opt);

    this.dictionaries = opt.dictionaries || [];
    this.errorIfAllErrors = (typeof opt.errorIfAllErrors === 'boolean')
      ? opt.errorIfAllErrors
      : true;
  }

  getDictInfos(options, cb) {
    let callsRemaining = this.dictionaries.length;
    if (callsRemaining === 0) return cb(null, { items: [] });

    const resMap = new Map();
    let errors = [];

    for (let dict of this.dictionaries) {
      resMap.set(dict, {});

      if (typeof dict.getDictInfos === 'function') {
        dict.getDictInfos(options, (err, res) => {
          // found err and errorIfAllErrors is false
          if (err && !this.errorIfAllErrors) return cb(err);
          errors.push(err);
          resMap.set(dict, res);

          --callsRemaining;
          // all calls have returned
          if (callsRemaining <= 0) {
            let res = [];
            for (let value of resMap.values())
              if (typeof value !== 'undefined') // in case there was an error
                res = res.concat(value.items);

            if (errors.every(err => err !== null)) {
              // if every call returned an error
              cb({ errors: errors });
            } else {
              cb(null, { items: res });
            }
          }
        });
      }
    }
  }

  getEntries(options, cb) {
    let callsRemaining = this.dictionaries.length;
    if (callsRemaining === 0) return cb(null, { items: [] });

    const resMap = new Map();
    let errors = [];

    for (let dict of this.dictionaries) {
      resMap.set(dict, {});

      if (typeof dict.getEntries === 'function') {
        dict.getEntries(options, (err, res) => {
          // found err and errorIfAllErrors is false
          if (err && !this.errorIfAllErrors) return cb(err);
          errors.push(err);
          resMap.set(dict, res);

          --callsRemaining;
          // all calls have returned
          if (callsRemaining <= 0) {
            let res = [];
            for (let value of resMap.values())
              if (typeof value !== 'undefined') // in case there was an error
                res = res.concat(value.items);

            if (errors.every(err => err !== null)) {
              // if every call returned an error
              cb({ errors: errors });
            } else {
              cb(null, { items: res });
            }
          }
        });
      }
    }
  }

  getEntryMatchesForString(str, options, cb) {
    if (!str || (str.trim() === '')) return cb(null, { items: [] });

    let callsRemaining = this.dictionaries.length;
    if (callsRemaining === 0) return cb(null, { items: [] });

    const resMap = new Map();
    let errors = [];

    for (let dict of this.dictionaries) {
      resMap.set(dict, {});

      if (typeof dict.getEntryMatchesForString === 'function') {
        dict.getEntryMatchesForString(str, options, (err, res) => {
          // found err and errorIfAllErrors is false
          if (err && !this.errorIfAllErrors) return cb(err);
          errors.push(err);
          resMap.set(dict, res);

          --callsRemaining;
          // all calls have returned
          if (callsRemaining <= 0) {
            let res = [];
            for (let value of resMap.values())
              if (typeof value !== 'undefined') // in case there was an error
                res = res.concat(value.items);

            if (errors.every(err => err !== null)) {
              // if every call returned an error
              cb({ errors: errors });
            } else {
              cb(null, { items: res });
            }
          }
        });
      }
    }
  }

};