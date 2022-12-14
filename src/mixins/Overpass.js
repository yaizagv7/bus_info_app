import OverpassQuery from '../osm/OverpassQuery'

export default {
    data: function () {
        return {
            bounds: null
        }
    },
    methods: {
        boundsToGeojson: function () {
            if(!this.bounds) {
                return {};
            }
            let sw = this.bounds._southWest;
            let ne = this.bounds._northEast;
            return {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [[
                        [sw.lng, sw.lat], [ne.lng, sw.lat],
                        [ne.lng, ne.lat], [sw.lng, ne.lat]
                    ]]
                }
            };
        },
        bboxToString: function (bounds) {
            return bounds._southWest.lat + ',' + bounds._southWest.lng + ','
                + bounds._northEast.lat + ',' + bounds._northEast.lng;
        },
        bboxFromCenter: function (latlon) {
            let bounds = L.latLngBounds([
                [
                    latlon.lat - 0.05,
                    latlon.lng - 0.1
                ],
                [
                    latlon.lat + 0.05,
                    latlon.lng + 0.1
                ]
            ]);
            this.bounds = bounds;
            return this.bboxToString(bounds);
        },
        buildQuery: function (center, key, valor) {
            let bbox = this.bboxFromCenter(center);
            let query = new OverpassQuery();
            let tags = [
                {k: key, v: valor}
            ];
            return query.nodeByTags(tags, bbox).body;
        },
        buildQueryRelation: function (center, valor) {
            let bbox = this.bboxFromCenter(center);
            let query = new OverpassQuery();
            let tag = valor;
            //console.log(query.nodeByTagsDouble(tags, bbox).body);
            return query.relationByTag(tag).body;
        },
        fetchAmenity: function (center, callback, errorCallback, key, valor) {
            fetch(process.env.VUE_APP_OVERPASS_URL, {
                method: 'POST',
                body: this.buildQuery(center, key, valor)
            })
                .then(function (response) {
                    if(!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                })
                .then(callback)
                .catch(errorCallback);
        },
        fetchRelation: function (center, callback, errorCallback, value) {
            fetch(process.env.VUE_APP_OVERPASS_URL, {
                method: 'POST',
                body: this.buildQueryRelation(center, value)
            })
                .then(function (response) {
                    if(!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                })
                .then(callback)
                .catch(errorCallback);
        },
        fetchNode: function (params, callback) {
            let query = new OverpassQuery();
            if(params.type === 'way') {
                query.wayById(params.node);
            }
            else {
                query.nodeById(params.node);
            }
            fetch(process.env.VUE_APP_OVERPASS_URL, {
                method: 'POST',
                body: query.body
            })
                .then(function (response) {
                    if(!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                })
                .then(callback);
        }
    }
}