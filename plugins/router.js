export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    console.log(app.i18n);

    //if(to.path.split("/")[0] === app.locale) next()
    //next(app.localePath({ path: to.path }));
    next(false);
  });
};
