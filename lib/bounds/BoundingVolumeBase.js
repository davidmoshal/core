var Box = require("awayjs-core/lib/geom/Box");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var BoundingVolumeBase = (function () {
    function BoundingVolumeBase() {
        this._pAabbPoints = new Array();
        this._pAabbPointsDirty = true;
        this._aabb = new Box();
    }
    Object.defineProperty(BoundingVolumeBase.prototype, "aabb", {
        get: function () {
            return this._aabb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingVolumeBase.prototype, "aabbPoints", {
        get: function () {
            if (this._pAabbPointsDirty)
                this.pUpdateAABBPoints();
            return this._pAabbPoints;
        },
        enumerable: true,
        configurable: true
    });
    BoundingVolumeBase.prototype.nullify = function () {
        this._aabb.x = this._aabb.y = this._aabb.z = 0;
        this._aabb.width = this._aabb.height = this._aabb.depth = 0;
        this._pAabbPointsDirty = true;
    };
    BoundingVolumeBase.prototype.fromVertices = function (vertices) {
        var i;
        var len = vertices.length;
        var minX, minY, minZ;
        var maxX, maxY, maxZ;
        if (len == 0) {
            this.nullify();
            return;
        }
        var v;
        minX = maxX = vertices[i++];
        minY = maxY = vertices[i++];
        minZ = maxZ = vertices[i++];
        while (i < len) {
            v = vertices[i++];
            if (v < minX)
                minX = v;
            else if (v > maxX)
                maxX = v;
            v = vertices[i++];
            if (v < minY)
                minY = v;
            else if (v > maxY)
                maxY = v;
            v = vertices[i++];
            if (v < minZ)
                minZ = v;
            else if (v > maxZ)
                maxZ = v;
        }
        this.fromExtremes(minX, minY, minZ, maxX, maxY, maxZ);
    };
    BoundingVolumeBase.prototype.fromSphere = function (center, radius) {
        this.fromExtremes(center.x - radius, center.y - radius, center.z - radius, center.x + radius, center.y + radius, center.z + radius);
    };
    BoundingVolumeBase.prototype.fromExtremes = function (minX, minY, minZ, maxX, maxY, maxZ) {
        this._aabb.x = minX;
        this._aabb.y = maxY;
        this._aabb.z = minZ;
        this._aabb.width = maxX - minX;
        this._aabb.height = maxY - minY;
        this._aabb.depth = maxZ - minZ;
        this._pAabbPointsDirty = true;
    };
    BoundingVolumeBase.prototype.isInFrustum = function (planes, numPlanes) {
        throw new AbstractMethodError();
    };
    BoundingVolumeBase.prototype.overlaps = function (bounds) {
        return this._aabb.intersects(bounds.aabb);
    };
    BoundingVolumeBase.prototype.clone = function () {
        throw new AbstractMethodError();
    };
    BoundingVolumeBase.prototype.rayIntersection = function (position, direction, targetNormal) {
        return -1;
    };
    BoundingVolumeBase.prototype.containsPoint = function (position) {
        return false;
    };
    BoundingVolumeBase.prototype.pUpdateAABBPoints = function () {
        var minX = this._aabb.x;
        var minY = this._aabb.y - this._aabb.height;
        var minZ = this._aabb.z;
        var maxX = this._aabb.x + this._aabb.width;
        var maxY = this._aabb.y;
        var maxZ = this._aabb.z + this._aabb.depth;
        this._pAabbPoints[0] = minX;
        this._pAabbPoints[1] = minY;
        this._pAabbPoints[2] = minZ;
        this._pAabbPoints[3] = maxX;
        this._pAabbPoints[4] = minY;
        this._pAabbPoints[5] = minZ;
        this._pAabbPoints[6] = minX;
        this._pAabbPoints[7] = maxY;
        this._pAabbPoints[8] = minZ;
        this._pAabbPoints[9] = maxX;
        this._pAabbPoints[10] = maxY;
        this._pAabbPoints[11] = minZ;
        this._pAabbPoints[12] = minX;
        this._pAabbPoints[13] = minY;
        this._pAabbPoints[14] = maxZ;
        this._pAabbPoints[15] = maxX;
        this._pAabbPoints[16] = minY;
        this._pAabbPoints[17] = maxZ;
        this._pAabbPoints[18] = minX;
        this._pAabbPoints[19] = maxY;
        this._pAabbPoints[20] = maxZ;
        this._pAabbPoints[21] = maxX;
        this._pAabbPoints[22] = maxY;
        this._pAabbPoints[23] = maxZ;
        this._pAabbPointsDirty = false;
    };
    BoundingVolumeBase.prototype.classifyToPlane = function (plane) {
        throw new AbstractMethodError();
    };
    BoundingVolumeBase.prototype.transformFrom = function (bounds, matrix) {
        throw new AbstractMethodError();
    };
    return BoundingVolumeBase;
})();
module.exports = BoundingVolumeBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ib3VuZHMvYm91bmRpbmd2b2x1bWViYXNlLnRzIl0sIm5hbWVzIjpbIkJvdW5kaW5nVm9sdW1lQmFzZSIsIkJvdW5kaW5nVm9sdW1lQmFzZS5jb25zdHJ1Y3RvciIsIkJvdW5kaW5nVm9sdW1lQmFzZS5hYWJiIiwiQm91bmRpbmdWb2x1bWVCYXNlLmFhYmJQb2ludHMiLCJCb3VuZGluZ1ZvbHVtZUJhc2UubnVsbGlmeSIsIkJvdW5kaW5nVm9sdW1lQmFzZS5mcm9tVmVydGljZXMiLCJCb3VuZGluZ1ZvbHVtZUJhc2UuZnJvbVNwaGVyZSIsIkJvdW5kaW5nVm9sdW1lQmFzZS5mcm9tRXh0cmVtZXMiLCJCb3VuZGluZ1ZvbHVtZUJhc2UuaXNJbkZydXN0dW0iLCJCb3VuZGluZ1ZvbHVtZUJhc2Uub3ZlcmxhcHMiLCJCb3VuZGluZ1ZvbHVtZUJhc2UuY2xvbmUiLCJCb3VuZGluZ1ZvbHVtZUJhc2UucmF5SW50ZXJzZWN0aW9uIiwiQm91bmRpbmdWb2x1bWVCYXNlLmNvbnRhaW5zUG9pbnQiLCJCb3VuZGluZ1ZvbHVtZUJhc2UucFVwZGF0ZUFBQkJQb2ludHMiLCJCb3VuZGluZ1ZvbHVtZUJhc2UuY2xhc3NpZnlUb1BsYW5lIiwiQm91bmRpbmdWb2x1bWVCYXNlLnRyYW5zZm9ybUZyb20iXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sR0FBRyxXQUFpQiwwQkFBMEIsQ0FBQyxDQUFDO0FBSXZELElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUVyRixJQUFNLGtCQUFrQjtJQU12QkEsU0FOS0Esa0JBQWtCQTtRQUdoQkMsaUJBQVlBLEdBQWlCQSxJQUFJQSxLQUFLQSxFQUFVQSxDQUFDQTtRQUNqREEsc0JBQWlCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUl2Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFDeEJBLENBQUNBO0lBRURELHNCQUFXQSxvQ0FBSUE7YUFBZkE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDbkJBLENBQUNBOzs7T0FBQUY7SUFFREEsc0JBQVdBLDBDQUFVQTthQUFyQkE7WUFFQ0csRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtnQkFDMUJBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7WUFFMUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBRU1BLG9DQUFPQSxHQUFkQTtRQUVDSSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUMvQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDNURBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDL0JBLENBQUNBO0lBRU1KLHlDQUFZQSxHQUFuQkEsVUFBb0JBLFFBQXNCQTtRQUV6Q0ssSUFBSUEsQ0FBUUEsQ0FBQ0E7UUFDYkEsSUFBSUEsR0FBR0EsR0FBVUEsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDakNBLElBQUlBLElBQVdBLEVBQUVBLElBQVdBLEVBQUVBLElBQVdBLENBQUNBO1FBQzFDQSxJQUFJQSxJQUFXQSxFQUFFQSxJQUFXQSxFQUFFQSxJQUFXQSxDQUFDQTtRQUUxQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZEEsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7WUFDZkEsTUFBTUEsQ0FBQ0E7UUFDUkEsQ0FBQ0E7UUFFREEsSUFBSUEsQ0FBUUEsQ0FBQ0E7UUFFYkEsSUFBSUEsR0FBR0EsSUFBSUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLElBQUlBLEdBQUdBLElBQUlBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1FBQzVCQSxJQUFJQSxHQUFHQSxJQUFJQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUU1QkEsT0FBT0EsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDaEJBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQ2xCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDWkEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUNsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ1pBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO2dCQUM1QkEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDbEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO2dCQUNaQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxH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QSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUNsREEsSUFBSUEsSUFBSUEsR0FBVUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDL0JBLElBQUlBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBO1FBRWxEQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzdCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzdCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzdCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzdCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzdCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLEtBQUtBLENBQUNBO0lBQ2hDQSxDQUFDQTtJQUVNYiw0Q0FBZUEsR0FBdEJBLFVBQXVCQSxLQUFhQTtRQUVuQ2MsTUFBTUEsSUFBSUEsbUJBQW1CQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFTWQsMENBQWFBLEdBQXBCQSxVQUFxQkEsTUFBeUJBLEVBQUVBLE1BQWVBO1FBRTlEZSxNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUNGZix5QkFBQ0E7QUFBREEsQ0F6SkEsQUF5SkNBLElBQUE7QUFFRCxBQUE0QixpQkFBbkIsa0JBQWtCLENBQUMiLCJmaWxlIjoiYm91bmRzL0JvdW5kaW5nVm9sdW1lQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm94XHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Cb3hcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5cbmNsYXNzIEJvdW5kaW5nVm9sdW1lQmFzZVxue1xuXHRwdWJsaWMgX2FhYmI6Qm94O1xuXHRwdWJsaWMgX3BBYWJiUG9pbnRzOkFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuXHRwdWJsaWMgX3BBYWJiUG9pbnRzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5fYWFiYiA9IG5ldyBCb3goKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgYWFiYigpOkJveFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FhYmI7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGFhYmJQb2ludHMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fcEFhYmJQb2ludHNEaXJ0eSlcblx0XHRcdHRoaXMucFVwZGF0ZUFBQkJQb2ludHMoKTtcblxuXHRcdHJldHVybiB0aGlzLl9wQWFiYlBvaW50cztcblx0fVxuXG5cdHB1YmxpYyBudWxsaWZ5KClcblx0e1xuXHRcdHRoaXMuX2FhYmIueCA9IHRoaXMuX2FhYmIueSA9IHRoaXMuX2FhYmIueiA9IDA7XG5cdFx0dGhpcy5fYWFiYi53aWR0aCA9IHRoaXMuX2FhYmIuaGVpZ2h0ID0gdGhpcy5fYWFiYi5kZXB0aCA9IDA7XG5cdFx0dGhpcy5fcEFhYmJQb2ludHNEaXJ0eSA9IHRydWU7XG5cdH1cblxuXHRwdWJsaWMgZnJvbVZlcnRpY2VzKHZlcnRpY2VzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB2ZXJ0aWNlcy5sZW5ndGg7XG5cdFx0dmFyIG1pblg6bnVtYmVyLCBtaW5ZOm51bWJlciwgbWluWjpudW1iZXI7XG5cdFx0dmFyIG1heFg6bnVtYmVyLCBtYXhZOm51bWJlciwgbWF4WjpudW1iZXI7XG5cblx0XHRpZiAobGVuID09IDApIHtcblx0XHRcdHRoaXMubnVsbGlmeSgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciB2Om51bWJlcjtcblxuXHRcdG1pblggPSBtYXhYID0gdmVydGljZXNbaSsrXTtcblx0XHRtaW5ZID0gbWF4WSA9IHZlcnRpY2VzW2krK107XG5cdFx0bWluWiA9IG1heFogPSB2ZXJ0aWNlc1tpKytdO1xuXG5cdFx0d2hpbGUgKGkgPCBsZW4pIHtcblx0XHRcdHYgPSB2ZXJ0aWNlc1tpKytdO1xuXHRcdFx0aWYgKHYgPCBtaW5YKVxuXHRcdFx0XHRtaW5YID0gdjsgZWxzZSBpZiAodiA+IG1heFgpXG5cdFx0XHRcdG1heFggPSB2O1xuXHRcdFx0diA9IHZlcnRpY2VzW2krK107XG5cdFx0XHRpZiAodiA8IG1pblkpXG5cdFx0XHRcdG1pblkgPSB2OyBlbHNlIGlmICh2ID4gbWF4WSlcblx0XHRcdFx0bWF4WSA9IHY7XG5cdFx0XHR2ID0gdmVydGljZXNbaSsrXTtcblx0XHRcdGlmICh2IDwgbWluWilcblx0XHRcdFx0bWluWiA9IHY7IGVsc2UgaWYgKHYgPiBtYXhaKVxuXHRcdFx0XHRtYXhaID0gdjtcblx0XHR9XG5cblx0XHR0aGlzLmZyb21FeHRyZW1lcyhtaW5YLCBtaW5ZLCBtaW5aLCBtYXhYLCBtYXhZLCBtYXhaKTtcblx0fVxuXG5cdHB1YmxpYyBmcm9tU3BoZXJlKGNlbnRlcjpWZWN0b3IzRCwgcmFkaXVzOm51bWJlcilcblx0e1xuXHRcdHRoaXMuZnJvbUV4dHJlbWVzKGNlbnRlci54IC0gcmFkaXVzLCBjZW50ZXIueSAtIHJhZGl1cywgY2VudGVyLnogLSByYWRpdXMsIGNlbnRlci54ICsgcmFkaXVzLCBjZW50ZXIueSArIHJhZGl1cywgY2VudGVyLnogKyByYWRpdXMpO1xuXHR9XG5cblx0cHVibGljIGZyb21FeHRyZW1lcyhtaW5YOm51bWJlciwgbWluWTpudW1iZXIsIG1pblo6bnVtYmVyLCBtYXhYOm51bWJlciwgbWF4WTpudW1iZXIsIG1heFo6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fYWFiYi54ID0gbWluWDtcblx0XHR0aGlzLl9hYWJiLnkgPSBtYXhZO1xuXHRcdHRoaXMuX2FhYmIueiA9IG1pblo7XG5cdFx0dGhpcy5fYWFiYi53aWR0aCA9IG1heFggLSBtaW5YO1xuXHRcdHRoaXMuX2FhYmIuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XG5cdFx0dGhpcy5fYWFiYi5kZXB0aCA9IG1heFogLSBtaW5aO1xuXHRcdHRoaXMuX3BBYWJiUG9pbnRzRGlydHkgPSB0cnVlO1xuXHR9XG5cblx0cHVibGljIGlzSW5GcnVzdHVtKHBsYW5lczpBcnJheTxQbGFuZTNEPiwgbnVtUGxhbmVzOm51bWJlcik6Ym9vbGVhblxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyBvdmVybGFwcyhib3VuZHM6Qm91bmRpbmdWb2x1bWVCYXNlKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYWFiYi5pbnRlcnNlY3RzKGJvdW5kcy5hYWJiKTtcblx0fVxuXG5cdHB1YmxpYyBjbG9uZSgpOkJvdW5kaW5nVm9sdW1lQmFzZVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyByYXlJbnRlcnNlY3Rpb24ocG9zaXRpb246VmVjdG9yM0QsIGRpcmVjdGlvbjpWZWN0b3IzRCwgdGFyZ2V0Tm9ybWFsOlZlY3RvcjNEKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdHB1YmxpYyBjb250YWluc1BvaW50KHBvc2l0aW9uOlZlY3RvcjNEKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgcFVwZGF0ZUFBQkJQb2ludHMoKVxuXHR7XG5cdFx0dmFyIG1pblg6bnVtYmVyID0gdGhpcy5fYWFiYi54O1xuXHRcdHZhciBtaW5ZOm51bWJlciA9IHRoaXMuX2FhYmIueSAtIHRoaXMuX2FhYmIuaGVpZ2h0O1xuXHRcdHZhciBtaW5aOm51bWJlciA9IHRoaXMuX2FhYmIuejtcblx0XHR2YXIgbWF4WDpudW1iZXIgPSB0aGlzLl9hYWJiLnggKyB0aGlzLl9hYWJiLndpZHRoO1xuXHRcdHZhciBtYXhZOm51bWJlciA9IHRoaXMuX2FhYmIueTtcblx0XHR2YXIgbWF4WjpudW1iZXIgPSB0aGlzLl9hYWJiLnogKyB0aGlzLl9hYWJiLmRlcHRoO1xuXG5cdFx0dGhpcy5fcEFhYmJQb2ludHNbMF0gPSBtaW5YO1xuXHRcdHRoaXMuX3BBYWJiUG9pbnRzWzFdID0gbWluWTtcblx0XHR0aGlzLl9wQWFiYlBvaW50c1syXSA9IG1pblo7XG5cdFx0dGhpcy5fcEFhYmJQb2ludHNbM10gPSBtYXhYO1xuXHRcdHRoaXMuX3BBYWJiUG9pbnRzWzRdID0gbWluWTtcblx0XHR0aGlzLl9wQWFiYlBvaW50c1s1XSA9IG1pblo7XG5cdFx0dGhpcy5fcEFhYmJQb2ludHNbNl0gPSBtaW5YO1xuXHRcdHRoaXMuX3BBYWJiUG9pbnRzWzddID0gbWF4WTtcblx0XHR0aGlzLl9wQWFiYlBvaW50c1s4XSA9IG1pblo7XG5cdFx0dGhpcy5fcEFhYmJQb2ludHNbOV0gPSBtYXhYO1xuXHRcdHRoaXMuX3BBYWJiUG9pbnRzWzEwXSA9IG1heFk7XG5cdFx0dGhpcy5fcEFhYmJQb2ludHNbMTFdID0gbWluWjtcblx0XHR0aGlzLl9wQWFiYlBvaW50c1sxMl0gPSBtaW5YO1xuXHRcdHRoaXMuX3BBYWJiUG9pbnRzWzEzXSA9IG1pblk7XG5cdFx0dGhpcy5fcEFhYmJQb2ludHNbMTRdID0gbWF4Wjtcblx0XHR0aGlzLl9wQWFiYlBvaW50c1sxNV0gPSBtYXhYO1xuXHRcdHRoaXMuX3BBYWJiUG9pbnRzWzE2XSA9IG1pblk7XG5cdFx0dGhpcy5fcEFhYmJQb2ludHNbMTddID0gbWF4Wjtcblx0XHR0aGlzLl9wQWFiYlBvaW50c1sxOF0gPSBtaW5YO1xuXHRcdHRoaXMuX3BBYWJiUG9pbnRzWzE5XSA9IG1heFk7XG5cdFx0dGhpcy5fcEFhYmJQb2ludHNbMjBdID0gbWF4Wjtcblx0XHR0aGlzLl9wQWFiYlBvaW50c1syMV0gPSBtYXhYO1xuXHRcdHRoaXMuX3BBYWJiUG9pbnRzWzIyXSA9IG1heFk7XG5cdFx0dGhpcy5fcEFhYmJQb2ludHNbMjNdID0gbWF4Wjtcblx0XHR0aGlzLl9wQWFiYlBvaW50c0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgY2xhc3NpZnlUb1BsYW5lKHBsYW5lOlBsYW5lM0QpOm51bWJlclxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyB0cmFuc2Zvcm1Gcm9tKGJvdW5kczpCb3VuZGluZ1ZvbHVtZUJhc2UsIG1hdHJpeDpNYXRyaXgzRClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQm91bmRpbmdWb2x1bWVCYXNlOyJdfQ==