"""
Lightweight Pure-Python NumPy Polyfill for E2B Sandbox Runtime
Provides array, arange, mean, sum, min, max, convolve, random, etc.
"""
import math
import random as _random

pi = math.pi
e = math.e
nan = float('nan')
inf = float('inf')

class ndarray(list):
    def __init__(self, data):
        if isinstance(data, (int, float)):
            data = [data]
        elif isinstance(data, (list, tuple)):
            data = [float(x) if isinstance(x, (int, float)) else x for x in data]
        else:
            data = list(data)
        super().__init__(data)

    @property
    def shape(self):
        return (len(self),)

    def tolist(self):
        return list(self)

    def __add__(self, other):
        if isinstance(other, (int, float)):
            return ndarray([x + other for x in self])
        return ndarray([x + y for x, y in zip(self, other)])

    def __radd__(self, other):
        return self.__add__(other)

    def __sub__(self, other):
        if isinstance(other, (int, float)):
            return ndarray([x - other for x in self])
        return ndarray([x - y for x, y in zip(self, other)])

    def __rsub__(self, other):
        if isinstance(other, (int, float)):
            return ndarray([other - x for x in self])
        return ndarray([y - x for x, y in zip(self, other)])

    def __mul__(self, other):
        if isinstance(other, (int, float)):
            return ndarray([x * other for x in self])
        return ndarray([x * y for x, y in zip(self, other)])

    def __rmul__(self, other):
        return self.__mul__(other)

    def __truediv__(self, other):
        if isinstance(other, (int, float)):
            return ndarray([x / other for x in self])
        return ndarray([x / y for x, y in zip(self, other)])

    def __getitem__(self, item):
        res = super().__getitem__(item)
        if isinstance(res, list):
            return ndarray(res)
        return res

    def mean(self):
        return mean(self)

    def sum(self):
        return sum(self)

    def min(self):
        return min(self)

    def max(self):
        return max(self)

def array(data, dtype=None):
    return ndarray(data)

def arange(start, stop=None, step=1):
    if stop is None:
        stop = start
        start = 0
    res = []
    curr = start
    while (curr < stop if step > 0 else curr > stop):
        res.append(curr)
        curr += step
    return ndarray(res)

def linspace(start, stop, num=50):
    if num <= 1:
        return ndarray([start])
    step = (stop - start) / (num - 1)
    return ndarray([start + i * step for i in range(num)])

def ones(shape):
    count = shape[0] if isinstance(shape, (tuple, list)) else shape
    return ndarray([1.0] * count)

def zeros(shape):
    count = shape[0] if isinstance(shape, (tuple, list)) else shape
    return ndarray([0.0] * count)

def mean(a, axis=None):
    items = list(a)
    return sum(items) / len(items) if items else 0.0

def sum(a, axis=None):
    import builtins
    return builtins.sum(list(a))

def min(a, axis=None):
    import builtins
    return builtins.min(list(a))

def max(a, axis=None):
    import builtins
    return builtins.max(list(a))

def convolve(a, v, mode='full'):
    a_list = list(a)
    v_list = list(v)
    res = []
    for i in range(len(a_list) - len(v_list) + 1):
        window = a_list[i : i + len(v_list)]
        dot = builtins_sum(x * y for x, y in zip(window, v_list))
        res.append(dot)
    return ndarray(res)

builtins_sum = sum

class RandomModule:
    def rand(self, *args):
        n = args[0] if args else 1
        return ndarray([_random.random() for _ in range(n)])

    def randn(self, *args):
        n = args[0] if args else 1
        return ndarray([_random.gauss(0, 1) for _ in range(n)])

    def randint(self, low, high=None, size=None):
        if high is None:
            high = low
            low = 0
        if size is None:
            return _random.randint(low, high - 1)
        count = size[0] if isinstance(size, (tuple, list)) else size
        return ndarray([_random.randint(low, high - 1) for _ in range(count)])

    def seed(self, s):
        _random.seed(s)

random = RandomModule()
