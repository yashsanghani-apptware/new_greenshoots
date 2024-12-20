from abc import ABC, abstractmethod

class CloudFunction(ABC):

    @abstractmethod
    def run(self):
        pass

    @abstractmethod
    def notify(self, message):
        pass

    @abstractmethod
    def read(self, key):
        pass

    @abstractmethod
    def write(self, key, value):
        pass

