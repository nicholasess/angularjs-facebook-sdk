describe('FacebookProvider', function () {

    var _facebookProvider;

    beforeEach(function () {
      // Initialize the service provider by injecting it to a fake module's config block
      angular.module('testApp', function () {})
        .config(function (facebookProvider) {
          _facebookProvider = facebookProvider;
        });

      // Initialize myApp injector
      module('angularjs-facebook-sdk', 'testApp');

      // Kickstart the injectors previously registered with calls to angular.mock.module
      inject(function () {});
    });

    describe('with custom configuration', function () {
      it('tests the providers internal function', inject(function ($injector) {
        // check sanity
        expect(_facebookProvider).not.toBeUndefined();

        // configure the provider
        _facebookProvider.setAppId('12345');
        _facebookProvider.setDebug(true);
        _facebookProvider.setLanguage('pt_BR');

        // Invoke the provider factory function
        var instance = $injector.invoke(_facebookProvider.$get);

        // test an instance of the provider for
        // the custom configuration changes
        expect(instance.appId).toBe('12345');
        expect(instance.debug).toBe(true);
        expect(instance.lang).toBe('pt_BR');
      }));

      it('should initialize the SDK', inject(function ($injector) {
        _facebookProvider.setAppId(1111);
        _facebookProvider.setLanguage('pt_BR');

        // Invoke the provider factory function
        var instance = $injector.invoke(_facebookProvider.$get);

        runs(function() {
          var promise = instance.init();
          expect(promise.then).toEqual(jasmine.any(Function));
        });

        waitsFor(function() {
          return window.FB != undefined
        }, "FB should be defined");

        runs(function() {
          expect(FB).not.toBe(undefined);
          expect(document.getElementsByTagName('script')[0].src).toContain('facebook');
          expect(document.getElementsByTagName('script')[0].src).toBe('http://connect.facebook.net/pt_BR/all.js');
        });
      }));
    });

});