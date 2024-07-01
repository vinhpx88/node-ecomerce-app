class DIContainer {
    constructor() {
        this.services = {};
        this.singletons = {};
    }

    register(name, definition, dependencies) {
        this.services[name] = { definition, dependencies };
    }

    singleton(name, definition, dependencies) {
        this.services[name] = { definition, dependencies, singleton: true };
    }

    get(name) {
        const service = this.services[name];

        if (!service) {
            throw new Error(`Service ${name} not found`);
        }

        if (service.singleton && this.singletons[name]) {
            return this.singletons[name];
        }

        const resolvedDependencies = service.dependencies.map(dep => this.get(dep));
        const instance = new service.definition(...resolvedDependencies);

        if (service.singleton) {
            this.singletons[name] = instance;
        }

        return instance;
    }
}

const container = new DIContainer();

const OrderService = require('./services/orderService');
const ProductService = require('./services/productService');
const UserService = require('./services/userService');
const OrderController = require('./controllers/orderController');
const ProductController = require('./controllers/productController');
const UserController = require('./controllers/userController');

// Register services
container.register('OrderService', OrderService, []);
container.register('ProductService', ProductService, []);
container.register('UserService', UserService, []);

// Register controllers with their dependencies
container.register('OrderController', OrderController, ['OrderService']);
container.register('ProductController', ProductController, ['ProductService']);
container.register('UserController', UserController, ['UserService']);

module.exports = container;
