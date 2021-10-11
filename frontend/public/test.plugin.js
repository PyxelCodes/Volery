

const { SnowflakeUtil } = VoleryApi;


export const module = {
    name: 'test',
    version: '0.0.1',
    author: 'PyxelCodes <pyxel@reefraid.com>',
    plugin () {
        console.log(SnowflakeUtil.generate())
    }
}