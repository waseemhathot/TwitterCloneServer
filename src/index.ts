// tslint:disable:no-console
import app from './app';
import { connectDb } from './middleware/store';


async function init() {
    await connectDb();
    
    app.set('port', process.env.PORT || 9000);

    const server = app.listen(app.get('port'), () => {
        console.log(
            '  App is running at http://localhost:%d in %s mode',
            app.get('port'),
            app.get('env'),
        );
        console.log('  Press CTRL-C to stop\n');
    });
}

init();
