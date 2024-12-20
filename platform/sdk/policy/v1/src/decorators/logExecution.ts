export function logExecution(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    console.log(`[LOG] Executing ${propertyName} with arguments:`, args);
    const result = await method.apply(this, args);
    console.log(`[LOG] ${propertyName} returned:`, result);
    return result;
  };

  return descriptor;
}

