import React from "react";
import { Image, Zap, Users } from "lucide-react";

export function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto mt-8 mb-12">
      <div className="bg-gradient-to-br from-blue-500 to-blue-800 p-6 rounded-xl shadow-sm border border-gray-500">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Image className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">100+</p>
            <p className="text-sm text-green-300">Images Processed</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-blue-800 p-6 rounded-xl shadow-sm border border-gray-500">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <Zap className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">90%</p>
            <p className="text-sm text-green-400">Accuracy Rate</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-blue-800 p-6 rounded-xl shadow-sm border border-gray-500">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">xK+</p>
            <p className="text-sm text-green-400">Active Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}
