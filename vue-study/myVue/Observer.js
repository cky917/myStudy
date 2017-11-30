import Dependence from './Dependence'

export default class Observer {
    constructor(value) {
        this.value = value
        this.walk(value)
    }
    //递归。。让每个字属性可以observe
    walk(value) {
        Object.keys(value).forEach(key => this.convert(key, value[key]))
    }
    convert(key, val) {
        defineReactive(this.value, key, val)
    }
}


export function defineReactive(obj, key, val) {
    let dep = new Dependence()
    let childOb = observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            if(Dep.target){
                dep.addSub(Dep.target)
            }
            return val
        },
        set: newVal => {
            childOb = observe(newVal)// 如果新赋值的值是个复杂类型。再递归它，加上set/get。。
            dep.notify()
        }
    })
}


export function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return
    }
    return new Observer(value)
}