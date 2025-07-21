import type { IParseResult } from './types'

type ParsedResultProps = {
  result: IParseResult
}

export const ImageParsingResult = ({ result }: ParsedResultProps) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg border-2 border-gray-300 shadow-md">
      <h4 className="font-bold mb-3 text-gray-800 flex items-center text-lg">
        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
        Parsed Result
      </h4>

      {typeof result === 'string' ? (
        <div
          className="p-3 bg-red-50 border border-red-200 rounded"
          dangerouslySetInnerHTML={{ __html: result }}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
            <div className="flex items-center mb-3">
              <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
              <h5 className="font-bold text-blue-800 text-lg">Front Side</h5>
            </div>
            <div
              className="text-base bg-white p-4 rounded-lg border-2 border-blue-200 min-h-[80px] font-medium"
              dangerouslySetInnerHTML={{ __html: result.front }}
            />
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-300">
            <div className="flex items-center mb-3">
              <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
              <h5 className="font-bold text-purple-800 text-lg">Back Side</h5>
            </div>
            <div
              className="text-base bg-white p-4 rounded-lg border-2 border-purple-200 min-h-[80px] font-medium"
              dangerouslySetInnerHTML={{ __html: result.back }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
