import { ACCEPTED_LANGUAGES } from "../../src/shared/constants";
import fs from 'fs'
import path from 'path'

describe('localizations', () => {
  const folders = fs
    .readdirSync(__dirname)
    .filter((file) => fs.statSync(path.join(__dirname, file)).isDirectory())
  test('check for localization folders', () => {
    expect(folders).toEqual(expect.arrayContaining(ACCEPTED_LANGUAGES))
    expect(folders.length).toEqual(ACCEPTED_LANGUAGES.length)
  })
  const defaultNs: Record<string, () => Promise<any>> = {}
  const defaultNsFiles = fs
    .readdirSync(path.join(__dirname, 'ru'))
    .filter((file) => file.endsWith('.json'))
  for (const file of defaultNsFiles) {
    defaultNs[file] = () => import(`./ru/${file}`).then((val) => val.default)
  }
  folders.forEach((locale) => {
    describe(`check ${locale} localization files`, () => {
      const localeNsFiles = fs
        .readdirSync(path.join(__dirname, locale))
        .filter((file) => file.endsWith('.json'))
      test(`${locale} contain all localization files`, () => {
        expect(localeNsFiles).toEqual(defaultNsFiles)
        expect(folders.length).toEqual(ACCEPTED_LANGUAGES.length)
      })
      localeNsFiles.forEach((file) => {
        test(`${locale}/${file} is equal to default ns`, async () => {
          const defaultFile = await defaultNs[file]()
          const localFile = (await import(`./${locale}/${file}`)).default
          const defaultKeys = getObjectKeys(defaultFile)
          const localKeys = getObjectKeys(localFile)
          expect(localKeys).toEqual(defaultKeys)
          expect(folders.length).toEqual(ACCEPTED_LANGUAGES.length)
          if (locale !== 'ru') {
            expect(localFile).not.toEqual(defaultFile)
          }
        })
      })
    })
  })
})

const getObjectKeys = (obj: any, path = ''): string[] => {
  let keys: string[] = []
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      keys = keys.concat(getObjectKeys(obj[key], `${path}${key}.`))
    } else {
      keys.push(`${path}${key}`)
    }
  }
  return keys
}
