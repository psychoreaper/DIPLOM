Ext.define('CUX.dashboard.TSP', {

    singleton: true,

    // решение задачи коммивояжёра
    runTSP: function (points, matrix) {
        var resultPoints = [];

        resultPoints = this.solveTSP(points, matrix);
        return resultPoints;
    },

    // поиск решения
    solveTSP: function (coordPoints, matrix) {
        var me = this,
            dist = matrix,
            points = [],
            n = coordPoints.length,
            d = new Array(1 << n).fill(0).map(() => new Array(n).fill(Number.POSITIVE_INFINITY)), // расстояние
            p = new Array(1 << n).fill(0).map(() => new Array(n).fill(Number.POSITIVE_INFINITY)); // маршрут

        for (var i = 0; i < n; i++) {
            points.push({id: i, coord: coordPoints[i]});
        }

        for (let i = 0; i < n; i++) {
            d[1 << i][i] = dist[0][i]
            p[1 << i][i] = 0
        }

        for (let bitmask = 1; bitmask < (1 << n); bitmask++) {
            for (var last = 0; last < n; last++) {
                if (d[bitmask][last] === Number.POSITIVE_INFINITY) { // если мы ещё ни разу не посетили такой набор учеников, закончив на ученике last
                    continue;
                }
                for (let next = 0; next < n; next++) {
                    if ((bitmask & (1 << next)) === 0 && // если мы ещё не забрали текущего ученика
                        d[bitmask | (1 << next)][next] > d[bitmask][last] + dist[last][next]
                    ) { // и мы нашли более короткий путь
                        d[bitmask | (1 << next)][next] = d[bitmask][last] + dist[last][next] // обновляем минимальное расстояние
                        p[bitmask | (1 << next)][next] = last
                        // массив p нужен чтоб восстановить кратчайший путь, мы записываем сюда вершину, из которой мы попали в данное состояние
                    }
                }
            }
        }

        var path = []
        var bitmask = (1 << n) - 1 // все единички типа
        var current = 0
        var tmp
        while (bitmask !== 0) {
            path.push(current) // добавляем текущую вершину в путь
            tmp = current
            current = p[bitmask][current] // переходим к предыдущей вершине
            bitmask ^= (1 << tmp) // удаляем вершину из маски
        }

        var res = [];
        for (let i = 0; i < n; i++) {
            res.push(coordPoints[path[i]]);
        }
        res.push(res[0]);

        return res;

        // bitmask | (1 << next) ставит единичку на nextовый бит
        // то есть допустим bitmask = 00010, next = 2. тогда мы ставим единичку на 2 позицию
    },

})