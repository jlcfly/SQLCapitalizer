import { keywords } from './keywords.js'

const Format = {
    keywordCase: 'U',
    origSqlArea: null,
    newSqlArea: null,

    init: function(origId, newId) {
        this.origSqlArea = document.getElementById(origId);
        if (this.origSqlArea == null) {
            console.error(origId+' does not exist')
            return
        }

        this.newSqlArea = document.getElementById(newId)
        if (this.newSqlArea == null) {
            console.error(newId+' does not exist')
            return
        }

        const self = this

        this.origSqlArea.addEventListener('blur', function() { self.format() })
        this.origSqlArea.addEventListener('paste', function(e) {
            e.preventDefault()

            let paste = (e.clipboardData || window.clipboardData).getData('text');
            this.value = paste
            self.format()
        })
    },

    format: function() {
        const self = this
        let newsql = this.origSqlArea.value

        keywords.forEach(function(keyword) {
            const re = new RegExp(`\\b${keyword}\\b`, 'gi');
            newsql = newsql.replace(re, (self.keywordCase == 'L' ? keyword.toLowerCase() : keyword.toUpperCase()))
        })

        return this.newSqlArea.value = newsql
    },

    setKeywordCase: function(value) {
        this.keywordCase = (value == 'L' ? 'L' : 'U')
    }
}

export default Format