export function measureExecutionTime(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const start = Date.now();
    const result = await method.apply(this, args);
    const end = Date.now();
    console.log(`[METRIC] ${propertyName} executed in ${end - start}ms`);
    return result;
  };

  return descriptor;
}

