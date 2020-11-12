module.exports.getPackageName = (scope = 'spryker') => {
  const packageName = process.env.LERNA_PACKAGE_NAME;

  if (!packageName) {
    throw new Error(
      `Package name does not exist in variable 'LERNA_PACKAGE_NAME'!`,
    );
  }

  return packageName.replace(`@${scope}/`, '');
};
