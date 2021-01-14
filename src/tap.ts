export default (...e: any[]) => {
    console.log('tap: ', ...e)
    return e;
}