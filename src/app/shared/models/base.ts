export function base(data: any, Ref: any = {}) {
  const instance = new Ref();
  let isEmpty = false;

  if (Object.keys(data).length === 0) isEmpty = true;

  Object.getOwnPropertyNames(instance).forEach((prop) => {
    if (isEmpty) {
      instance[prop] = "";
      return;
    }

    if (Array.isArray(instance[prop]) || typeof instance[prop] === "object") {
      instance[prop] = data[prop];
      return instance;
    }

    if (!(instance[prop] in data)) {
      // console.info(
      //   `${instance[prop]} is not a mapped property for: ${Ref.name}`
      // );
      return;
    }
    data[instance[prop]] = data[instance[prop]] || "";
    instance[prop] = data[instance[prop]];
  });
  return instance;
}

export function transform(data: any, Ref: any = {}) {
  const instance = new Ref();
  const obj: any = {};

  Object.keys(data).map((prop) => {
    if (!(prop in instance)) {
      // console.info(`${prop} is not a mapped property for: ${Ref.name}`);
      return;
    }
    obj[instance[prop]] = data[prop];
  });
  Object.keys(instance).map(
    (prop) => (obj[instance[prop]] = obj[instance[prop]] || "")
  );

  return obj;
}
