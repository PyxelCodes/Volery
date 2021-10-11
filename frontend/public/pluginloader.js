window.pluginLoader = {
  async loadPlugin(moduleId) {
    let imported = await import(`/${moduleId}.plugin.js`);

    let module = imported.module || imported.plugin || imported.default;

    return module;
  },
};
