import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [options.paths.src.root, 'node_modules'],
        mainFiles: ['index'],
        alias: {
            "@root": options.paths.src.root,
            "@app": options.paths.src.app,
            "@pages": options.paths.src.pages,
            "@widgets": options.paths.src.widgets,
            "@features": options.paths.src.features,
            "@entities": options.paths.src.entities,
            "@shared": options.paths.src.shared,
          },
    };
}
