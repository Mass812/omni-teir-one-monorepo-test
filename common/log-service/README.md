# log-service

This module defines a provider for the LogService, and also defines a provider for the deps object that is injected into the LogService constructor. This module also exports the LogService, so it can be imported and used in other parts of your application.

To use the LogService, you would simply inject it into a controller or service like this:

```
import { Injectable } from '@nestjs/common';
import { LogService } from './scribe.service';

@Injectable()
export class MyService {
  constructor(private readonly logService: LogService) {
    this.logService.init();
  }
}
```

To use the LogService in a controller, you would simply inject it into the controller's constructor and then call its methods as needed.

Here is an example of how you could use the LogService in a controller:

```
import { Controller, Get } from '@nestjs/common';
import { LogService } from './scribe.service';

@Controller()
export class MyController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getData(): Promise<any> {
    this.logService.info('Retrieving data');
    // retrieve data from database or API, etc.
  }
}
```

In this example, the LogService is injected into the MyController and its info method is called to log a message when the getData route is accessed.

You can also use the other methods of the LogService, such as warn and error, to log messages at different levels.

#### Log Functions

  log(level, message, metaData);
  warn | verbose | error | info (message, metaData)
  
  **Note** 
  The logger and queue methods are public. This was so the unit tests could be written and pass successfully.

Note this is a play off Blayters implementation. 