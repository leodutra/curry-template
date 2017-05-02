var test = require('tape')
var curryTemplate = require('../curry-template')

test('curryTemplate(String, Object) -> String', function(t) {
    var params = { id: '549873456448' }
    var curried = curryTemplate('/api/users/${id}/')
    t.equals(curried(params), "/api/users/549873456448/", 'should replace ${id} mark')
    t.end()
})

test('curryTemplate("${0}/${1}/${2}", Array) -> String', function(t) {
    var arrayBuildPath = curryTemplate('/api/users/${0}/${1}/${2}', [null, null, 'ascending'])
    t.equals(arrayBuildPath(['549873456448', 'getUser']), "/api/users/549873456448/getUser/ascending", 'should replace ${0}..${n} marks')
    t.end()
})

test('curryTemplate(Object, Object) -> Object', function(t) {
    var configTemplate = {
        a: ['/api/users/${id}/${action}'],
        b: { 
            deep: {
                foo: [
                    { 
                        stuff: 'DEFAULT_ENV=${env}'
                    }
                ] 
            }
        },
        c: function() { console.log('avoided') },
        d: /keepRegExp/gim,
        e: 'keep simple texts',
        f: 10
    }
    var defaults = {action: 'defaultAction', env: '/usr/bin/bash'}
    var configBuilder = curryTemplate(clone(configTemplate), defaults)
    var builtResults = configBuilder({id: '549873456448'})
    t.equal(builtResults.a[0], "/api/users/549873456448/defaultAction")
    t.equal(builtResults.b.deep.foo[0], configTemplate.b.deep.foo[0])
    t.equal(builtResults.b.deep.foo[0].stuff, "DEFAULT_ENV=/usr/bin/bash")
    t.equal(builtResults.e, configTemplate.e)
    t.equal(builtResults.f, configTemplate.f)
    t.end()
})

function clone(obj) {
    var res = {}
    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) res[prop] = obj[prop]
    }
    return res
}
