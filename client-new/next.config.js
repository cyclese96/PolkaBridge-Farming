module.exports = {
    poweredByHeader: false,
    generateEtags: false,
    exportPathMap: async () => {
        return {
            '/': { page: '/farming' },
            '/farming': { page: '/farming' },
            '/swap': { page: '/swap' },
            '/launchpad': { page: '/launchpad' },
            '/lending': { page: '/lending' },
            '/prediction': { page: '/prediction' }
        }
    }
}